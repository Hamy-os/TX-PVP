$(() => {
    let isCamOpen = false

    // listen for nui messages
    window.addEventListener('message', (event) => {
        if (event.data.type === 'cameraVisible') {
            if (!event.data.value) {
                $(".cameraOverlay").hide()
                isCamOpen = false
            } else {
                $(".cameraOverlay").show()
                isCamOpen = true
                $(".location").text(event.data.location)
            }
        }
        if (event.data.type === "setCamLocation") {
            $(".location").text(event.data.location)
        }
    });
    // cunt
})