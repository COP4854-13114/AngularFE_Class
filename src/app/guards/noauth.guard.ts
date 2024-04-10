import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { BloggerService } from '../services/blogger.service';

export const noauthGuard: CanActivateFn = (route, state) => {
  let bloggedSvc = inject(BloggerService);
  let router = inject(Router);
  if(bloggedSvc.currentUserToken)
  {
    return true;
  }
  else
  {
    alert('You must be logged in to access this page!');
    router.navigate(['/Login']);
    return false;
  }
};
