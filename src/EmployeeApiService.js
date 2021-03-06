import * as firebase from 'firebase/app';
import 'firebase/firestore';

firebase.initializeApp({
  apiKey: 'AIzaSyD-VuCYQOiC6IM1KdOV5wh0EkkWIqNiqzM',
  authDomain: 'graduate-work-7c99e.firebaseapp.com',
  projectId: 'graduate-work-7c99e',
});

export class EmployeeApiService {
  constructor() {
    this.database = firebase.firestore();
    this.employeeCollection = this.database.collection('employees');
  }

  async getEmployees() {
    try {
      const snapshot = await this.employeeCollection.get();
      const employees = snapshot.docs.map((employeeDoc) => ({
        id: employeeDoc.id,
        ...employeeDoc.data(),
      }));

      return employees;
    } catch (error) {
      console.error(error);
    }
    return [];
  }

  async updateEmployee(changedEmployee, originalEmployeeId) {
    await this.employeeCollection.doc(originalEmployeeId).update({
      name: changedEmployee.name,
      position: changedEmployee.position,
      trackId: changedEmployee.trackId,
      permittedZoneIds: changedEmployee.permittedZoneIds,
    });
  }

  async createEmployee(newEmployee) {
    await this.employeeCollection.doc(newEmployee.id).set({
      name: newEmployee.name,
      position: newEmployee.position,
      trackId: newEmployee.trackId,
      permittedZoneIds: newEmployee.permittedZoneIds,
    });
  }

  async removeEmployee(employeeToRemove) {
    await this.employeeCollection.doc(employeeToRemove.id).delete();
  }
}
