import { HttpInterceptorFn } from '@angular/common/http';
import { BloggerService } from '../services/blogger.service';
import { inject } from '@angular/core';

export const btinterInterceptor: HttpInterceptorFn = (req, next) => {
  let bloggerSvc = inject(BloggerService);
  if(bloggerSvc.currentUserToken)
  {
    req = req.clone({
      setHeaders:{
        Authorization: `Bearer ${bloggerSvc.currentUserToken.token}`
      }
    })
  }
  return next(req);
};
