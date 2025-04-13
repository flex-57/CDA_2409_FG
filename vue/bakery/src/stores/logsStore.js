import { onMounted, reactive, watch } from 'vue'

export const useLogsStore = () => {
    const stateLogs = reactive({
        logs: [],
    })

    const addLogs = (log) => {
        const now = new Date()
        const time = now.toLocaleTimeString()

        if (stateLogs.logs.length >= 10) {
            stateLogs.logs.shift()
        }
        stateLogs.logs.push(`[ ${time} ]  ${log}`)
    }

    watch(
        () => stateLogs,
        (val) => {
            localStorage.setItem('logs', JSON.stringify(val))
        },
        { deep: true },
    )

    onMounted(() => {
        const saveLogs = JSON.parse(localStorage.getItem('logs'))
        if (saveLogs) Object.assign(stateLogs, saveLogs)
    })

    return { stateLogs, addLogs }
}
