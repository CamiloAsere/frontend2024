
// proxy.js
export class RealSubject {
    request() {
        return "RealSubject: Handling request.";
    }
}

export class Proxy {
    constructor(realSubject) {
        this.realSubject = realSubject;
    }

    request() {
        if (this.checkAccess()) {
            const result = this.realSubject.request();
            this.logAccess();
            return result;
        }
    }

    checkAccess() {
        // Algunas comprobaciones de seguridad reales deben ir aquí.
        console.log("Proxy: Checking access prior to firing a real request.");
        return true;
    }

    logAccess() {
        console.log("Proxy: Logging the time of request.");
    }
}

/*****/
// Video.js
export class Video {
    play() {
        throw new Error("Este método debe ser sobrescrito");
    }
}
// RealVideo.js
import { Video } from './Video.js';

export class RealVideo extends Video {
    constructor(title) {
        super();
        this.title = title;
    }

    play() {
        return `Reproduciendo el video: ${this.title}`;
    }
}
// VideoProxy.js
import { Video } from './Video.js';

export class VideoProxy extends Video {
    constructor(realVideo, user) {
        super();
        this.realVideo = realVideo;
        this.user = user;
    }

    play() {
        if (this.user.subscription === 'premium') {
            return this.realVideo.play();
        } else {
            return 'Debes tener una suscripción premium para ver este video';
        }
    }
}

// main.js
import { RealVideo, VideoProxy } from './Video.js';

const realVideo = new RealVideo('Mi video favorito');

const user = {
    name: 'Juan',
    subscription: 'free'
};

const proxy = new VideoProxy(realVideo, user);

console.log(proxy.play());  // Debes tener una suscripción premium para ver este video

user.subscription = 'premium';

console.log(proxy.play());  // Reproduciendo el video: Mi video favorito

