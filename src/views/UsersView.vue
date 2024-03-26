<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <v-text-field v-model="name" class="ma-2" density="compact" placeholder="Search name..." variant="outlined" color="deep-purple-lighten-1"></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="2">
        <v-btn @click="createDessert">Aggiungi</v-btn>
      </v-col>
    </v-row>
  </v-container>

  <v-data-table-server
    v-model:items-per-page="itemsPerPage"
    :headers="headers"
    :items="serverItems"
    :items-length="totalItems"
    :loading="loading"
    :search="JSON.stringify(search)"
    item-value="name"
    @update:options="loadItems"
  />

</template>

<script setup>
import { ref, watch } from 'vue';

// Reactive variables
const itemsPerPage = ref(5);
const headers = [
  { title: 'Name', align: 'start', sortable: true, key: 'name'},
  { title: 'Last Name', key: 'lastName', align: 'end' },
  { title: 'DOB', key: 'birthDate', sortable: false, align: 'end' },
  { title: 'fiscalCode', key: 'fiscalCode', sortable: false,  align: 'end' },
  { title: 'phoneNumber', key: 'phoneNumber', sortable: false, align: 'end' },
  { title: 'Delete', key: '', sortable: false, align: 'end' },
];
const serverItems = ref([]);
const loading = ref(true);
const totalItems = ref(0);
const name = ref('');
const lastName = ref('');

const search = ref({ name: '' }); 

const desserts = [
  {
    name: 'Pippo Baudo',
    lastName: 159,
    birthDate: 6.0,
    fiscalCode: 24,
    phoneNumber: '123 4567890'
  },
  {
    name: 'Pippo Baudo',
    lastName: 159,
    birthDate: 6.0,
    fiscalCode: 24,
    phoneNumber: ''
  },
  {
    name: 'Pippo Baudo',
    lastName: 159,
    birthDate: 6.0,
    fiscalCode: 24,
    phoneNumber: ''
  },
  {
    name: 'Pippo Baudo',
    lastName: 159,
    birthDate: 6.0,
    fiscalCode: 24,
    phoneNumber: ''
  },
  {
    name: 'Pippo Baudo',
    lastName: 159,
    birthDate: 6.0,
    fiscalCode: 24,
    phoneNumber: ''
  },
  {
    name: 'Pippo Baudo',
    lastName: 159,
    birthDate: 6.0,
    fiscalCode: 24,
    phoneNumber: ''
  },
  {
    name: 'Pippo Baudo',
    lastName: 159,
    birthDate: 6.0,
    fiscalCode: 24,
    phoneNumber: '',
  },
  {
    name: 'Pippo Baudo',
    lastName: 159,
    birthDate: 6.0,
    fiscalCode: 24,
    phoneNumber: ''
  },
  {
    name: 'Pippo Baudo',
    lastName: 159,
    birthDate: 6.0,
    fiscalCode: 24,
    phoneNumber: ''
  },
  {
    name: 'Pippo Baudo',
    lastName: 159,
    birthDate: 6.0,
    fiscalCode: 24,
    phoneNumber: ''
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
watch(name, (newValue) => {
  search.value.name = newValue;
});


// Method to create a new dessert
const createDessert = () => {
  const newDessert = {
    name: name.value,
    lastName: lastName.value,
    birthDate: birthDate.value,
    fiscalCode: fiscalCode.value,
    phoneNumber: phoneNumber.value
  };
  FakeAPI.create(newDessert).then(() => {
    loadItems({ page: 1, itemsPerPage: itemsPerPage.value, sortBy: [] });
  });
};

// Method to update an existing dessert
const updateDessert = (id, updates) => {
  FakeAPI.update(id, updates).then(() => {
    loadItems({ page: 1, itemsPerPage: itemsPerPage.value, sortBy: [] });
  });
};

// Method to delete a dessert
const deleteDessert = (id) => {
  FakeAPI.delete(id).then(() => {
    loadItems({ page: 1, itemsPerPage: itemsPerPage.value, sortBy: [] });
  });
};

const FakeAPI = {
  desserts: ref(desserts),

  fetch({ page, itemsPerPage, sortBy, search }) {
    return new Promise((resolve) => {
      setTimeout(() => {
        let items = desserts.slice();

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

  create(dessert) {
    desserts.push(dessert);
    return Promise.resolve(dessert);
  },

  update(id, updates) {
    const index = desserts.value.findIndex(dessert => dessert.name === id);
    if (index !== -1) {
      Object.assign(desserts.value[index], updates);
      return Promise.resolve(desserts.value[index]);
    } else {
      return Promise.reject(new Error(`Dessert with ID ${id} not found`));
    }
  },

  delete(id) {
    const index = desserts.value.findIndex(dessert => dessert.name === id);
    if (index !== -1) {
      desserts.value.splice(index, 1);
      return Promise.resolve();
    } else {
      return Promise.reject(new Error(`Dessert with ID ${id} not found`));
    }
  }
};


</script>
