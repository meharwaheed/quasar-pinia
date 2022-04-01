import { defineStore } from 'pinia';
import { colors, Notify } from 'quasar';
import {LocalStorage} from "quasar";
// LocalStorage.set('storage', 'ssr')
export const useCrudStore = defineStore('crud', {
  state: () => ({
    students: [
      {name: 'Abdul Waheed', email: 'waheed@nodesol.com', age: 22}
    ],
    storage: LocalStorage.getItem('storage')
  }),
  getters: {
    students_arr: (state) => state.students,
    getStudentByEmail: (state) => {
      return (email) => state.students.find((student) => student.email === email)
    },
  },
  actions: {
    add(student) {
       if(student.name && student.email && student.age) {
         if(!this.getStudentByEmail(student.email)) {
          this.students.push(JSON.parse(JSON.stringify(student)))
          Notify.create({
            position: 'top',
            color: 'positive',
            message: 'Student created successfully!'
          })
         } else {
          Notify.create({
            position: 'top',
            color: 'negative',
            message: 'Student with this email is already exists'
          })
         }
       } else {
         Notify.create({
           position: 'top',
           color: 'negative',
           message: 'Please fill all the fields'
         })
       }
    },
    update(student) {
      const index = this.students.findIndex(stu => {return stu.email === student.email })
       if(index !== -1)
        this.students.splice(index, 1, JSON.parse(JSON.stringify(student)))
      Notify.create({
        position: 'top',
        color: 'positive',
        message: 'Student updated successfully!'
      })
    },
    remove(email) {
      const index = this.students.findIndex(stu => {return stu.email === email })
       if(index !== -1)
        this.students.splice(index, 1)
      Notify.create({
        position: 'top',
        color: 'positive',
        message: 'Student deleted successfully!'
      })
    }
  },
});
