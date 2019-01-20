import {Injectable} from '@angular/core'
import {HttpClient} from "@angular/common/http"
import {environment} from '@app-env/environment'
import {Cache} from '@app-root/core/services/cache.service'
import {map} from 'rxjs/operators'

@Injectable()
export class UserService_Rest {
    _url = environment.app_api_url + '/login';

    constructor(private http: HttpClient,
                private cache: Cache) {}

    get() {
        return this.http.get(this._url)
            .pipe(
                map(body => {
                    this.cache.set('username', body["username"])
                })
            )
    }

    login(username: string) {
        return this.http.post(this._url, {'username': username})
            .pipe(
                map(body => {
                    this.cache.set('username', body["username"])
                })
            )        
    }

    logout() {
        return this.http.delete(this._url)
            .pipe(
                map(() => {
                    this.cache.set('username', '')
                })
            )
    }
}