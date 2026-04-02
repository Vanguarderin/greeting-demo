import os from "os";

/**
 * Auto-detect the machine's LAN IP address.
 * Returns the first non-internal IPv4 address, or "127.0.0.1" as fallback.
 */
export function getLanIP(): string {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
        for (const iface of interfaces[name]!) {
            if (iface.family === "IPv4" && !iface.internal) {
                return iface.address;
            }
        }
    }
    return "127.0.0.1";
}
