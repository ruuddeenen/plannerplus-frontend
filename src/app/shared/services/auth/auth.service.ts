import { Injectable, NgZone } from '@angular/core'
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore'
import { AngularFireAuth } from '@angular/fire/auth'
import { Router } from '@angular/router'
import { User } from './user';
import { EmployeeService } from "../api/employee/employee.service";
import { Employee } from '../api/employee/employee';

@Injectable({ providedIn: 'root' })
export class AuthService {
  userData: any;

  constructor(
    public fireStore: AngularFirestore,
    public fireAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    public employeeService: EmployeeService
  ) {
    this.fireAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user
        localStorage.setItem('user', JSON.stringify(this.userData))

        JSON.parse(localStorage.getItem('user'))
        this.fireAuth.idToken.subscribe(
          data => {
            localStorage.setItem('X-Firebase-Auth-Token', data)
          }
        )
      } else {
        localStorage.removeItem('user')
        localStorage.removeItem('X-Firebase-Auth-Token')
        JSON.parse(localStorage.getItem('user'))
      }
    })
  }


  // log in with email/password
  async login(email, password) {
    return this.fireAuth.auth.signInWithEmailAndPassword(email, password)
      .then((result) => {
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

  async setUserData(user) {
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

  async logout() {
    return this.fireAuth.auth.signOut()
      .then(() => {
        localStorage.removeItem('user')
        this.router.navigate(['login'])
      })
  }

  async register(employee: Employee, password: string) {
    return await this.fireAuth.auth.createUserWithEmailAndPassword(employee.email, password)
      .then((result) => {
        this.setUserData(result.user)
        employee.uuid = result.user.uid
        this.registerEmployee(employee)
        result.user.updateProfile({
          displayName: employee.name + ' ' + employee.surname
        })
      }).then(() => {
        window.location.href = '/profile'
      }).catch((error) => {
        this.fireAuth.auth.currentUser.delete()
        console.log(error)
        alert('Account could not be registered at this time.')
      })
  }

  registerEmployee(employee: Employee) {
    this.fireAuth.idToken.subscribe(
      data => {
        localStorage.setItem('X-Firebase-Auth-Token', data)
        console.log('[token] : ', localStorage.getItem('X-Firebase-Auth-Token'))
        this.employeeService.post(employee)
      }
    )
  }
}
