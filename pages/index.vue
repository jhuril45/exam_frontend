<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card class="logo py-4 d-flex justify-center">
        <NuxtLogo />
        <VuetifyLogo />
      </v-card>
      <v-card class="pa-4 mt-2">
        <button type="button" class="add-btn" @click="addTask">Add Task</button>
        <table>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
          <tr v-for="task in tasks" :key="task.id">
            <td>{{task.title}}</td>
            <td>{{task.description}}</td>
            <td>{{task.status}}</td>
            <td>
              <button type="button" class="edit-btn" @click="editTask(task)">Edit</button>
              <button type="button" class="delete-btn" @click="deleteTask(task.id)">Delete</button>
            </td>
          </tr>
        </table>

      </v-card>

      <Modal :isVisible="showModal" @close="showModal = false">
        <h1>{{ form.id ? 'Edit Task' : 'Create Task' }}</h1>
        <div class="task-form">
          <form @submit.prevent="form.id ? updateTask() : createTask()">
            <input type="text" v-model="form.title" placeholder="Title" required/>
            <input type="text" v-model="form.description" placeholder="Description" required/>
            <button type="submit" class="submit-btn">Submit</button>
          </form>

        </div>
      </Modal>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from "vuex";
import Modal from '~/components/Modal.vue';

export default {
  name: 'IndexPage',
  componenets: {
    Modal
  },
  data() {
    return {
      ...mapState(['user']),
      tasks: [],
      title: '',
      description: '',
      status: 'todo',
      showModal: false,
      form: {
        id: null,
        title: null,
        description: null,
        status: 'todo'
      }
    }

  },
  mounted() {
    if (this.user) this.fetchTasks()

  },
  methods: {
      addTask () {
        this.form = {
          id: null,
          title: null,
          description: null,
          status: 'todo'
        }
        this.showModal = true;
      },
      editTask (task) {
        this.form = {
          id: task.id,
          title: task.title,
          description: task.description,
          status: 'todo'
        }
        this.showModal = true;
      },
      async fetchTasks() {
        try {
          const query = `
            query {
              tasks{
                id
                title
                description
                status
              }
            }
          `

          const response = await this.$axios.post('/graphql',{
            query,
            // variables: { id: this.user.id}
          })

          const { data } = response.data;

          console.log('fetchTasks', data.tasks)
          this.tasks = data.tasks
        } catch (e) {
          console.log('login error',e.message);
        }
      },
      async createTask() {
        try {
          const query = `
            mutation ($title: String!, $description: String, $status: String!) {
              createTask(title: $title, description: $description, status: $status) {
                id
                title
                description
                status
              }
            }
          `

          const response = await this.$axios.post('/graphql',{
            query,
            variables: { title: this.form.title, description: this.form.description, status: this.form.status }
          })

          const { data } = response.data;

          console.log('data', data.createTask)
          await this.fetchTasks()
          this.showModal = false
        } catch (e) {
          // console.log('createTask error',e.message);
        }
      },
      async updateTask() {
        try {
          const query = `
            mutation ($id: Int!, $title: String!, $description: String, $status: String!) {
              updateTask(id: $id, title: $title, description: $description, status: $status) {
                id
                title
                description
                status
              }
            }
          `

          const response = await this.$axios.post('/graphql',{
            query,
            variables: { id: this.form.id, title: this.form.title, description: this.form.description, status: this.form.status }
          })

          const { data } = response.data;

          console.log('data', data.updateTask)
          await this.fetchTasks()
          this.showModal = false
        } catch (e) {
          // console.log('updateTask error',e.message);
        }
      },
      async deleteTask(id) {
        try {
          const query = `
            mutation ($id: Int!) {
              deleteTask(id: $id) {
                id
              }
            }
          `


          const response = await this.$axios.post('/graphql',{
            query,
            variables: { id }
          })

          const { data } = response.data;

          console.log('data', data.deleteTask)
          await this.fetchTasks()
          this.showModal = false
        } catch (e) {
          console.log('deleteTask error',e.message);
        }
      },

    },

}
</script>


<style lang="scss">
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  /* background-color: #dddddd; */
}

.submit-btn {
  margin-top: 10px;
  padding: 5px;
  border-radius: 5px;
  background-color: green;
  color: white;
  width: 100%;
}

.add-btn {
  margin-bottom: 10px;
  padding: 5px;
  border-radius: 5px;
  background-color: green;
  color: white;
  width: 100%;
}

.edit-btn {
  padding: 5px;
  border-radius: 5px;
  background-color: yellow;
  color: black;
}

.delete-btn {
  padding: 5px;
  border-radius: 5px;
  background-color: red;
  color: white;
}

.task-form {
  width: 350px;

  input {
    margin-bottom: 15px;
    color: white;
    padding: 5px;
    width: 100%;
    border-radius: 5px;
    border: solid white;

  }
}
</style>
