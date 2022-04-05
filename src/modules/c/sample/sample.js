import { LightningElement, track, api } from 'lwc';
import { setConnection } from 'c/omniscriptConnection';

const greetings = [
    'Hello',
    'Bonjour',
    '你好',
    'Hola',
    'Привет',
    'こんにちは',
    'Guten Tag',
    'ጤና ይስጥልኝ',
    'Ciao',
    'नमस्ते',
    '안녕하세요'
];
const SPEED_CLASS_MAP = {
    slow: 'fade-slow',
    fast: 'fade-fast',
    medium: 'fade-medium'
};
const DEFAULT_SPEED = 'medium';

export default class Sample extends LightningElement {
    @track animationSpeed = DEFAULT_SPEED;
    @track index = 0;
    @track isAnimating = true;
    @track _user;
    @track _prefill;
    @track customCtor;

    @api layout;
    @api
    set speed(value) {
        if (SPEED_CLASS_MAP[value]) {
            this.animationSpeed = value;
        } else {
            this.animationSpeed = DEFAULT_SPEED;
        }
        this.isAnimating = true;
    }

    // Return the internal speed property
    get speed() {
        return this.animationSpeed;
    }

    // Get the current greeting
    get greeting() {
        return greetings[this.index];
    }

    // Map slow, medium, fast to CSS Animations
    get animationClass() {
        if (this.isAnimating) {
            return SPEED_CLASS_MAP[this.speed];
        }
        return 'hide';
    }

    @api
    set user(data) {
        if (data) {
            this._user = data;
        }
    }

    get user() {
        return this._user;
    }

    @api
    set prefill(data) {
        if (data) {
            this._prefill = data;
        }
    }

    get prefill() {
        return this._prefill;
    }

    async loadCtor() {
        const ctor = await import('c/lwcPublicMethod');
        this.customCtor = ctor.default;
    }

    //Handle the animation ending, update to next hello
    handleAnimationEnd() {
        this.isAnimating = false;
        this.index = (this.index + 1) % greetings.length;

        setTimeout(() => this.updateGreeting(), 500);
    }

    // Update to the next greeting and start animating
    updateGreeting() {
        this.isAnimating = true;
    }

    fireEvent() {
        this.dispatchEvent(
            new CustomEvent('notify_react', {
                bubbles: true,
                composed: true,
                detail: { isAnimating: this.isAnimating }
            })
        );
    }
}
