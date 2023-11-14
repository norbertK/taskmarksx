export class Ring<T> extends Array<T> {
	currentIndex: number = 0;

	constructor(...items: T[]) {
		super(...items);
	}

	get current(): T {
		return this[this.currentIndex];
	}

	set current(item: T) {
		this[this.currentIndex] = item;
	}

	get first(): T {
		return this[0];
	}

	get last(): T {
		return this[this.length - 1];
	}

	next(): T {
		this.currentIndex = (this.currentIndex + 1) % this.length;
		return this.current;
	}

	prev(): T {
		this.currentIndex = (this.currentIndex - 1 + this.length) % this.length;
		return this.current;
	}

	insertBefore(item: T): void {
		this.splice(this.currentIndex, 0, item);
		this.currentIndex = (this.currentIndex + 1) % this.length;
	}

	insertAfter(item: T): void {
		this.splice(this.currentIndex + 1, 0, item);
		this.currentIndex = (this.currentIndex + 1) % this.length;
	}

	delete(key: T): void {
		const index = this.indexOf(key);
		if (index !== -1) {
			this.splice(index, 1);
			if (index <= this.currentIndex) {
				this.currentIndex--;
			}
		}
	}

	deleteCurrent(): void {
		this.splice(this.currentIndex, 1);
		if (this.currentIndex >= this.length) {
			this.currentIndex = 0;
		}
	}
}
