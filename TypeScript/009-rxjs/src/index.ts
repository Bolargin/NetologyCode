import { of, from, fromEvent, forkJoin } from 'rxjs';
import { filter, map, catchError, delay, switchMap, first} from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

fromEvent(document.querySelector('input'), 'input').pipe(
  delay(500),
  map(res => (res.target as HTMLInputElement).value),
  filter(res => res.length > 2),
  switchMap(res => {
    return from(
      forkJoin(
      {
        github: ajax.getJSON(`https://api.github.com/search/repositories?q=${res}`).pipe(
          //map(res => res =  JSON.stringify(res).substring(0, 20)),
          first(),
          catchError(err => {
            throw 'Ошибка githab: ' + err;
          })
        ),
        gitlab: ajax.getJSON(`https://gitlab.com/api/v4/projects?search=${res}`).pipe(
          //map(res => res = JSON.stringify(res).substring(0, 20)),
          first(),
          catchError(err => {
            throw 'Ошибка gitlab: ' + err;
          })
        )
      })
      )
  })
).subscribe({
  next: (res) => console.log(res),
  error: (err) => console.log(err)
})