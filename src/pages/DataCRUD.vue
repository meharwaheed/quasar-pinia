<template>
  <q-page class="q-pl-lg">
     <div class="row">
       <div class="col-12">
          <h4>Student CRUD with Options API using Pinia 🍍!</h4>
           <p> store.$state = {{store.$state}}  </p>

            <div class="q-pa-md bg-grey-10 text-white" v-if="students_arr.length">
              <q-list dark bordered separator>
                <q-item
                v-for="stu in students_arr"
                :key="stu"
              >
                  <q-item-section>{{stu.name}}</q-item-section>
                  <q-item-section>{{stu.email}}</q-item-section>
                  <q-item-section>{{stu.age}}</q-item-section>

                  <q-item-section>
                     <q-btn-group spread>
                      <q-btn color="purple"  icon="edit" @click="edit(stu.email)" />
                      <q-btn color="warning" icon="delete" @click="remove(stu.email)" />
                    </q-btn-group>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
        </div>
        <div class="col-4">
           <q-input class="q-mx-sm" v-model="student.name" label="Name"/>
        </div>
        <div class="col-4">
           <q-input class="q-mx-sm" v-model="student.email" label="Email" :disable="is_update ? true : false"/>
        </div>
        <div class="col-4">
           <q-input class="q-mx-sm" v-model="student.age" label="Age"/>
        </div>
        <div class="col-12">
           <q-btn
             label="Reset store to initial statae"
             class="q-mt-md"
             color="red"
             @click="store.$reset()"
           />
           <q-btn v-if="!is_update" class="float-right q-mt-md q-mr-md" icon="add" color="primary" label="Add" @click="add(student)"/>
           <q-btn v-else class="float-right q-mt-md q-mr-md" icon="refresh" color="primary" label="Update" @click="update(student)"/>
        </div>
     </div>
  </q-page>
</template>

<script>
import { ref, defineComponent } from 'vue'
import { useCrudStore } from 'src/stores/crud'
import { mapState, mapActions } from 'pinia'
const store = useCrudStore()
export default {
  data() {
    return {
      store: store,
      is_update: false,
      student: {
        name: null,
        email: null,
        age: null
      }
    }
  },
  methods: {
     ...mapActions(useCrudStore, ['add', 'remove']),
    async update(student) {
      // store.students = [] you can update store directly from component
      await store.update(student)
      this.is_update = false
    },
    edit(email) {
      this.is_update = true
      this.student = JSON.parse(JSON.stringify(this.getStudentByEmail(email)))
    }
  },
  computed: {
     ...mapState(useCrudStore, ['students', 'students_arr', 'getStudentByEmail']), // to use state and getters
  }

}
</script>
