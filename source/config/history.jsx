/**
 * History Module
 *
 * Import a history strategy from the history module and enclose it
 * in a globally accessible variable for React Router and other
 * components to access.
 */

// Use hash history since this is a bookmarklet and has no server-side component
import createHashHistory from "history/lib/createHashHistory"
export default createHashHistory()
