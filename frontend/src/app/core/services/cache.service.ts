
import {Subject} from 'rxjs'
import {Injectable} from '@angular/core'

//Cache service that allow components to share data
@Injectable()
export class Cache {

    _cache = {};
    _emitter = new Subject<any>();

    constructor() {}

    get emitter(): Subject<any> {
        return this._emitter;
    }

    set(key: string, value: {}) {
        this._cache[key] = value
        this._emitter.next(this._cache)
    }
}