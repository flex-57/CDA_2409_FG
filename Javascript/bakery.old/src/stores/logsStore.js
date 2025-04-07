import { reactive } from 'vue'

export const useLogsStore = () => {
    const state = reactive({
        logs: [],
    })

    const addLogs = (log) => {
        const now = new Date()
        const time = now.toLocaleTimeString()

        if (state.logs.length >= 20) {
            state.logs.shift()
        }
        state.logs.push(`[ ${time} ]  ${log}`)
    }

    return { state, addLogs }
}
