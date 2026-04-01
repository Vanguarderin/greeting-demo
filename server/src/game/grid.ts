import { type AABB, type Collider, coldet } from "../../../shared/utils/coldet";
import { collider } from "../../../shared/utils/collider";
import { math } from "../../../shared/utils/math";
import { type Vec2, v2 } from "../../../shared/utils/v2";

interface GameObject {
    __gridCells: Vec2[];
    bounds: AABB;
    pos: Vec2;
}

/**
 * A Grid to filter collision detection of game objects
 */
export class Grid<T extends GameObject = GameObject> {
    readonly width: number;
    readonly height: number;
    readonly cellSize = 64;

    //                        X     Y     Object
    //                      __^__ __^__   __^__
    private readonly _grid: Array<Array<Set<T>>>;
    private _seenCounter = 0;
    private _seen = new Map<T, number>();

    constructor(width: number, height: number) {
        this.width = Math.floor(width / this.cellSize);
        this.height = Math.floor(height / this.cellSize);

        this._grid = Array.from({ length: this.width + 1 }, () =>
            Array.from({ length: this.height + 1 }, () => new Set()),
        );
    }

    addObject(obj: T): void {
        this.updateObject(obj);
    }

    /**
     * Add an object to the grid system
     */
    updateObject(obj: T): void {
        this.remove(obj);

        const cells = obj.__gridCells;

        const aabb = obj.bounds;
        // Get the bounds of the hitbox
        // Round it to the grid cells
        const min = this._roundToCells(v2.add(aabb.min, obj.pos));
        const max = this._roundToCells(v2.add(aabb.max, obj.pos));

        // Add it to all grid cells that it intersects
        for (let x = min.x; x <= max.x; x++) {
            const xRow = this._grid[x];
            for (let y = min.y; y <= max.y; y++) {
                xRow[y].add(obj);
                cells.push({ x, y });
            }
        }
    }

    /**
     * Remove an object from the grid system
     */
    remove(obj: T): void {
        const cells = obj.__gridCells;

        for (let i = 0; i < cells.length; i++) {
            const cell = cells[i];
            this._grid[cell.x][cell.y].delete(obj);
        }
        cells.length = 0;
    }

    /**
     * Get all objects near this collider
     * This transforms the collider into a rectangle
     * and gets all objects intersecting it after rounding it to grid cells
     * @param coll The collider
     * @return An array with the objects near this collider
     */
    intersectCollider(coll: Collider): T[] {
        const aabb = collider.toAabb(coll);

        const min = this._roundToCells(aabb.min);
        const max = this._roundToCells(aabb.max);

        const result: T[] = [];
        const seenId = ++this._seenCounter;

        for (let x = min.x; x <= max.x; x++) {
            const xRow = this._grid[x];
            for (let y = min.y; y <= max.y; y++) {
                const cell = xRow[y];
                for (const object of cell) {
                    const obj = object as T & { __seenId?: number };
                    if (obj.__seenId !== seenId) {
                        obj.__seenId = seenId;
                        result.push(object);
                    }
                }
            }
        }

        return result;
    }

    intersectColliderSet(coll: Collider): Set<T> {
        return new Set(this.intersectCollider(coll));
    }

    intersectPos(pos: Vec2) {
        pos = this._roundToCells(pos);
        return [...this._grid[pos.x][pos.y]];
    }

    intersectLineSegment(a: Vec2, b: Vec2): T[] {
        // Use DDA-style traversal for line segments instead of full AABB
        const minCell = this._roundToCells(a);
        const maxCell = this._roundToCells(b);

        // If start and end are in the same cell or adjacent, just do AABB
        if (
            Math.abs(maxCell.x - minCell.x) <= 1 &&
            Math.abs(maxCell.y - minCell.y) <= 1
        ) {
            return this.intersectCollider(coldet.lineSegmentToAabb(a, b));
        }

        // For longer segments, step through cells along the line
        const result: T[] = [];
        const seenId = ++this._seenCounter;

        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const steps = Math.max(
            Math.abs(maxCell.x - minCell.x),
            Math.abs(maxCell.y - minCell.y),
        );

        const visited = new Set<number>();
        for (let i = 0; i <= steps; i++) {
            const t = steps === 0 ? 0 : i / steps;
            const px = a.x + dx * t;
            const py = a.y + dy * t;
            const cx = math.clamp(Math.floor(px / this.cellSize), 0, this.width);
            const cy = math.clamp(Math.floor(py / this.cellSize), 0, this.height);
            const key = cx * (this.height + 1) + cy;
            if (visited.has(key)) continue;
            visited.add(key);

            // Also check adjacent cells to handle edge cases
            for (let ox = -1; ox <= 1; ox++) {
                for (let oy = -1; oy <= 1; oy++) {
                    const nx = cx + ox;
                    const ny = cy + oy;
                    if (nx < 0 || nx > this.width || ny < 0 || ny > this.height) continue;
                    const nkey = nx * (this.height + 1) + ny;
                    if (visited.has(nkey) && !(ox === 0 && oy === 0)) continue;
                    if (ox !== 0 || oy !== 0) visited.add(nkey);

                    const cell = this._grid[nx][ny];
                    for (const object of cell) {
                        const obj = object as T & { __seenId?: number };
                        if (obj.__seenId !== seenId) {
                            obj.__seenId = seenId;
                            result.push(object);
                        }
                    }
                }
            }
        }

        return result;
    }

    /**
     * Rounds a position to this grid cells
     */
    private _roundToCells(vector: Vec2): Vec2 {
        return {
            x: math.clamp(Math.floor(vector.x / this.cellSize), 0, this.width),
            y: math.clamp(Math.floor(vector.y / this.cellSize), 0, this.height),
        };
    }
}
