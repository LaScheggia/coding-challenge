<template>
  <v-container>
    <!-- Form for adding a new user -->
    <div>
      <v-form class="mb-16" ref="userForm" @submit.prevent="isEditing ? updateUser() : createUser">
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field v-model="newUser.name" label="Name" variant="underlined" color="deep-purple-lighten-1" required></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field v-model="newUser.lastName" label="Last Name" variant="underlined" color="deep-purple-lighten-1" required></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field v-model="newUser.birthDate" label="Date of Birth" variant="underlined" color="deep-purple-lighten-1" required></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field v-model="newUser.fiscalCode" label="Fiscal Code" variant="underlined" color="deep-purple-lighten-1" required></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field v-model="newUser.phoneNumber" label="Phone Number" variant="underlined" color="deep-purple-lighten-1" required></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-btn type="submit" color="deep-purple-lighten-1">{{ isEditing ? 'Update User' : 'Add User' }}</v-btn>
        </v-col>
      </v-row>
    </v-form>
    </div>

    <v-divider class="border-opacity-100" color="deep-purple-lighten-1"></v-divider>

    <!-- Data table -->
    <v-data-table-server
      v-model:items-per-page="itemsPerPage"
      :headers="headers"
      :items="serverItems"
      :items-length="totalItems"
      :loading="loading"
      :search="JSON.stringify(search)"
      item-value="name"
      @update:options="loadItems"
    >
      <!-- Custom actions column -->
      <template v-slot:item.actions="{ item }">
        <!-- Edit button -->
        <v-icon @click="editUser(item)" color="cyan-darken-2">mdi-pencil</v-icon>
        <!-- Delete button -->
        <v-icon @click="deleteUser(item)" color="red-darken-4">mdi-delete</v-icon>
      </template>
    </v-data-table-server>
  </v-container>
</template>

<script setup>
import { ref, watch } from 'vue';

// Reactive variables
const itemsPerPage = ref(5);
const headers = [
  { title: 'Name', align: 'start', sortable: true, key: 'name'},
  { title: 'Last Name', key: 'lastName', align: 'end' },
  { title: 'DOB', key: 'birthDate', sortable: false, align: 'end' },
  { title: 'Fiscal Code', key: 'fiscalCode', sortable: false,  align: 'end' },
  { title: 'Phone Number', key: 'phoneNumber', sortable: false, align: 'end' },
  { title: 'Actions', key: 'actions', sortable: false, align: 'end' },
];
const serverItems = ref([]);
const loading = ref(true);
const totalItems = ref(0);
const search = ref({ name: '' }); 
const newUser = ref({
  name: '',
  lastName: '',
  birthDate: '',
  fiscalCode: '',
  phoneNumber: ''
});
const isEditing = ref(false);
let editedUser = null;

const users = [
  {
    name: 'Pippo',
    lastName: 'Baudo',
    birthDate: '1990-01-01',
    fiscalCode: 'ABC1234567890DEF',
    phoneNumber: '1234567890'
  },
  {
    name: 'Mario',
    lastName: 'Rossi',
    birthDate: '1985-05-15',
    fiscalCode: 'DEF0987654321ABC',
    phoneNumber: '0987654321'
  },
  {
    name: 'Anna',
    lastName: 'Verdi',
    birthDate: '1978-09-30',
    fiscalCode: 'GHI9876543210JKL',
    phoneNumber: '9876543210'
  },
  {
    name: 'Giuseppe',
    lastName: 'Bianchi',
    birthDate: '1992-03-20',
    fiscalCode: 'MNO1234567890PQR',
    phoneNumber: '5678901234'
  },
  {
    name: 'Laura',
    lastName: 'Neri',
    birthDate: '1980-12-05',
    fiscalCode: 'STU2345678901VWX',
    phoneNumber: '2345678901'
  },
  {
    name: 'Paolo',
    lastName: 'Giallo',
    birthDate: '1995-07-10',
    fiscalCode: 'YZA3456789012BCD',
    phoneNumber: '3456789012'
  },
  {
    name: 'Chiara',
    lastName: 'Rosa',
    birthDate: '1973-04-25',
    fiscalCode: 'EFG4567890123HIJ',
    phoneNumber: '4567890123'
  },
  {
    name: 'Roberto',
    lastName: 'Blu',
    birthDate: '1988-11-15',
    fiscalCode: 'KLM5678901234NOP',
    phoneNumber: '6789012345'
  },
  {
    name: 'Eleonora',
    lastName: 'Viola',
    birthDate: '1997-02-28',
    fiscalCode: 'QRS6789012345TUV',
    phoneNumber: '7890123456'
  },
  {
    name: 'Sara',
    lastName: 'Arancio',
    birthDate: '1982-08-18',
    fiscalCode: 'WXY7890123456ZAB',
    phoneNumber: '8901234567'
  },
];

// Method to load items from server
const loadItems = ({ page, itemsPerPage, sortBy }) => {
  loading.value = true;
  FakeAPI.fetch({ page, itemsPerPage, sortBy, search: search.value }).then(({ items, total }) => {
    serverItems.value = items;
    totalItems.value = total;
    loading.value = false;
  });
};

// Watch for changes in the 'name' variable and update the 'search' object
watch(newUser, () => {
  search.value.name = newUser.value.name;
});

// Method to create a new user
const createUser = async () => {
  try {
    await FakeAPI.create(newUser.value);
    await loadItems({ page: 1, itemsPerPage: itemsPerPage.value, sortBy: [] });
    // Reset the form fields after successfully creating a user
    newUser.value = {
      name: '',
      lastName: '',
      birthDate: '',
      fiscalCode: '',
      phoneNumber: ''
    };
  } catch (error) {
    console.error('Error creating user:', error);
  }
};

// Method to update an existing user
const updateUser = async () => {
  try {
    await FakeAPI.update(editedUser.name, newUser.value);
    await loadItems({ page: 1, itemsPerPage: itemsPerPage.value, sortBy: [] });
    // Reset the form fields after successfully updating a user
    newUser.value = {
      name: '',
      lastName: '',
      birthDate: '',
      fiscalCode: '',
      phoneNumber: ''
    };
    isEditing.value = false;
  } catch (error) {
    console.error('Error updating user:', error);
  }
};

// Method to edit a user
const editUser = (user) => {
  newUser.value = { ...user };
  editedUser = user;
  isEditing.value = true;
};

// Method to delete a user
const deleteUser = (user) => {
  try {
    const index = serverItems.value.findIndex(u => u === user);
    if (index !== -1) {
      serverItems.value.splice(index, 1);
      FakeAPI.delete(user.name);
      totalItems.value--;
    }
  } catch (error) {
    console.error('Error deleting user:', error);
  }
};

const FakeAPI = {
  users: ref(users),

  fetch({ page, itemsPerPage, sortBy, search }) {
    return new Promise((resolve) => {
      setTimeout(() => {
        let items = users.slice();

        if (search.name) {
          items = items.filter(item => item.name.toLowerCase().includes(search.name.toLowerCase()));
        }

        if (sortBy.length) {
          const sortKey = sortBy[0].key;
          const sortOrder = sortBy[0].order;
          items.sort((a, b) => {
            const aValue = a[sortKey];
            const bValue = b[sortKey];
            return sortOrder === 'desc' ? bValue - aValue : aValue - bValue;
          });
        }

        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const paginated = items.slice(start, end);

        resolve({ items: paginated, total: items.length });
      }, 500);
    });
  },

  create(user) {
    users.push(user);
    return Promise.resolve(user);
  },

  update(name, updates) {
    const index = users.findIndex(u => u.name === name);
    if (index !== -1) {
      Object.assign(users[index], updates);
      return Promise.resolve();
    } else {
      return Promise.reject(new Error(`User with name ${name} not found`));
    }
  },

  delete(name) {
    const index = users.findIndex(u => u.name === name);
    if (index !== -1) {
      users.splice(index, 1);
      return Promise.resolve();
    } else {
      return Promise.reject(new Error(`User with name ${name} not found`));
    }
  }
};
</script>

<style lang="scss" scoped>

</style>