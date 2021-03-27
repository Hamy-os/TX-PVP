$(() => {
    let isCamOpen = false
    let cameraCount = 0
        // listen for nui messages
    window.addEventListener('message', (event) => {
        if (event.data.type === 'cameraVisible') {
            if (!event.data.value) {
                $(".cameraOverlay").hide()
                isCamOpen = false
            } else {
                isCamOpen = true
                cameraCount = event.data.count
                $(".location").text(`${event.data.location} (${event.data.index}/${cameraCount})`)
                $(".cameraOverlay").show()
            }
        }
        if (event.data.type === "setCamLocation") {
            $(".location").text(`${event.data.location} (${event.data.index}/${cameraCount})`)
        }
    });
    // cunt
})