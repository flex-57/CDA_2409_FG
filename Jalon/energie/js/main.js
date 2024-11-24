window.onscroll = () => showBackTop()
        
const showBackTop = () => {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        document.querySelector(".back-top").classList.add("show")
    } else {
        document.querySelector(".back-top").classList.remove("show")
    }
}