import { Injectable, NgZone } from '@angular/core'
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore'
import { AngularFireAuth } from '@angular/fire/auth'
import { Router } from '@angular/router'
import { User } from './user';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userData: any;

  constructor(
    public fireStore: AngularFirestore,
    public fireAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) {
    this.fireAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user
        localStorage.setItem('user', JSON.stringify(this.userData))
        JSON.parse(localStorage.getItem('user'))
      } else {
        localStorage.setItem('user', null)
        JSON.parse(localStorage.getItem('user'))
      }
    })
  }


  // log in with email/password
  login(email, password) {
    return this.fireAuth.auth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['profile'])
        });
        this.setUserData(result.user)
      }).catch((error) => {
        window.alert(error.meessage)
      })
  }

  forgotPassword(passwordResetEmail) {
    return this.fireAuth.auth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check you inbox.')
      }).catch((error) => {
        window.alert(error)
      })
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'))
    return (user !== null) ? true : false
  }

  setUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.fireStore.doc(`users/${user.id}`)
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    return userRef.set(userData, {
      merge: true
    })
  }

  logout() {
    return this.fireAuth.auth.signOut()
      .then(() => {
        localStorage.removeItem('user')
        this.router.navigate(['login'])
      })
  }
}
