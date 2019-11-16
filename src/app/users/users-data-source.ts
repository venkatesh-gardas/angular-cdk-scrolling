import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { UserService } from './user.service';
import { User } from './user.model';

export class UsersDataSource extends DataSource<User> {
  private users = Array.from<User>({ length: 0 });
  private dataStream = new BehaviorSubject<User[]>(this.users);
  private subscription = new Subscription();

  private pageSize = 10;
  private lastPage = 0;

  private fetchUser(): void {
    this.userService.getUsers().subscribe(res => {
      this.users = this.users.concat(res);
      this.dataStream.next(this.users);
    });
  }

  private getPageForIndex(i: number): number {
    return Math.floor(i / this.pageSize);
  }

  constructor(private userService: UserService) {
    super();
    this.fetchUser();
  }

  connect(collectionViewer: CollectionViewer): Observable<User[] | ReadonlyArray<User>> {
    this.subscription.add(collectionViewer.viewChange.subscribe(range => {
      const currentPage = this.getPageForIndex(range.end);
      if (currentPage > this.lastPage) {
        this.lastPage = currentPage;
        this.fetchUser();
      }
    }));
    return this.dataStream;
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.subscription.unsubscribe();
  }
}
