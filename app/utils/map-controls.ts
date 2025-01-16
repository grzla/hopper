function orbitCamera(map, options = {}) {
    const config = {
        center: options.center || { lat: 0, lng: 0 },
        radius: options.radius || 0.001,
        tilt: options.tilt || 45,
        zoom: options.zoom || 18,
        speed: options.speed || 0.02,
        interval: options.interval || 50,
        rotations: options.rotations || 1,
        onComplete: options.onComplete || null
    }

    let angle = 0
    let rotationCount = 0
    
    const cameraMoveInterval = setInterval(() => {
        // calculate new camera position
        const lat = config.center.lat + (config.radius * Math.cos(angle))
        const lng = config.center.lng + (config.radius * Math.sin(angle))
        
        map.moveCamera({
            center: { lat, lng },
            tilt: config.tilt,
            heading: (angle * (180/Math.PI)) - 90,
            zoom: config.zoom
        })
        
        angle += config.speed
        
        // check if completed requested number of rotations
        if (angle > Math.PI * 2) {
            rotationCount++
            angle = 0
            
            if (rotationCount >= config.rotations) {
                clearInterval(cameraMoveInterval)
                if (config.onComplete) config.onComplete()
            }
        }
    }, config.interval)
    
    // return control methods
    return {
        stop: () => clearInterval(cameraMoveInterval)
    }
}

export default orbitCamera 