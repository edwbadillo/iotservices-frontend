<template>
  <div class="card">
    <div class="card-header">
      <h4 class="card-title">Profile | {{ user.username }}</h4>
    </div>
    <div class="card-body">
      My account information.

      <div class="row">
        <div class="col-sm-12 col-md-8">
          <table class="table table-bordered mt-3">
            <tbody>
              <tr>
                <th>Full Name</th>
                <td>{{ user.fullName }}</td>
              </tr>
              <tr>
                <th>First name</th>
                <td>{{ user.firstName }}</td>
              </tr>
              <tr>
                <th>Last name</th>
                <td>{{ user.lastName }}</td>
              </tr>
              <tr>
                <th>Email</th>
                <td>{{ user.email }}</td>
              </tr>
              <tr>
                <th>Roles</th>
                <td>{{ user.roles }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="col-sm-12 col-md-4 mt-3 d-flex flex-column align-items-center">
          <div>
            <router-link class="w-100 btn btn-primary" :to="{name: 'Change Password'}">
            Change password
            </router-link>
            <button class="w-100 btn btn-danger mt-2">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { getStore } from '@/store'
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const store = getStore();
    const user = store.state.user;
    return {
      user
    }
  },
})
</script>
