$(() => {
    let isCamOpen = false

    // listen for nui messages
    window.addEventListener('message', (event) => {
        if (event.data.type === 'cameraVisible') {
            if (isCamOpen) {
                $(".cameraOverlay").hide()
                isCamOpen = false
            } else {
                $(".cameraOverlay").show()
                isCamOpen = true
            }
        }
        if (event.data.type === "setCamLocation") {
            //TODO! set cam locations
        }
    });
})