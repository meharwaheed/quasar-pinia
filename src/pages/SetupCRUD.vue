<template>
  <q-page class="q-pl-lg">
     <div class="row">
       <div class="col-12">
          <h4>Student CRUD with Composition API using Pinia 🍍!</h4>
            <div class="q-pa-md bg-grey-10 text-white" v-if="store.students.length">
              <q-list dark bordered separator>
                <q-item
                v-for="stu in store.students"
                :key="stu"
              >
                  <q-item-section>{{stu.name}}</q-item-section>
                  <q-item-section>{{stu.email}}</q-item-section>
                  <q-item-section>{{stu.age}}</q-item-section>

                  <q-item-section>
                     <q-btn-group spread>
                      <q-btn color="purple"  icon="edit" @click="edit(stu.email)" />
                      <q-btn color="warning" icon="delete" @click="store.remove(stu.email)" />
                    </q-btn-group>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
        </div>
        <div class="col-4">
           <q-input class="q-mx-sm" v-model="stu_name" label="Name"/>
        </div>
        <div class="col-4">
           <q-input class="q-mx-sm" v-model="stu_email" label="Email" :disable="is_update ? true : false"/>
        </div>
        <div class="col-4">
           <q-input class="q-mx-sm" v-model="stu_age" label="Age"/>
        </div>
        <div class="col-12">
          <q-btn
             label="Reset store to initial statae"
             class="q-mt-md"
             color="red"
             @click="store.$reset()"
           />
           <q-btn v-if="!is_update" class="float-right q-mt-md q-mr-md" icon="add" color="primary" label="Add" @click="add()"/>
           <q-btn v-else class="float-right q-mt-md q-mr-md" icon="refresh" color="primary" label="Update" @click="update()"/>
        </div>
     </div>
  </q-page>
</template>

<script>
import { ref, defineComponent, reactive, toRefs } from 'vue'
import { useCrudStore } from 'src/stores/crud'
import { mapState, mapActions } from 'pinia'
export default {
  setup() {
    const store = useCrudStore()
    let stu_name = ref('')
    let stu_email = ref('')
    let stu_age = ref('')
    let is_update = ref(0)

    const edit = (email) => {
      is_update.value = true
      let student = store.getStudentByEmail(email)
      stu_name.value = student.name
      stu_email.value  = student.email
      stu_age.value = student.age

    }
    let  update = () => {
      is_update.value = false
      store.update({name: stu_name.value, email: stu_email.value, age: stu_age.value})


    }
    let add = () => {
      store.add({name: stu_name.value, email: stu_email.value, age: stu_age.value})
    }

    return {
      // ...toRefs(student),
      // student,
      store,
      is_update,
      stu_name,
      stu_email,
      stu_age,
      add,
      edit,
      update
    }
  },

}
</script>
