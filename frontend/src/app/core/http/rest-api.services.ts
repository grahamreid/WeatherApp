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
                map(username => {
                    this.cache.set('username', username)
                })
            )
    }

    login(username: string) {
        return this.http.post(this._url, {'username': username})
            .pipe(
                map(username => {
                    this.cache.set('username', username)
                })
            )        
    }
}