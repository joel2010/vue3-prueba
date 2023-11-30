<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import { useGlobalStore } from '../store/global'
import { storeToRefs } from 'pinia';
import useCategories from '../composables/useCategories';

const globalStore = useGlobalStore()
const { loading } = storeToRefs(globalStore)
const { fnFetchData, records } = useCategories()

const filters = ref({
	global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

onMounted(async () => {
	await fnFetchData()
})
</script>
<template>
	<Card>
		<template #title>Categorías</template>
		<template #content>
			<DataTable :value="records" tableStyle="min-width: 50rem" v-model:filters="filters" :loading="loading"
				:globalFilterFields="['title']">
				<template #header>
					<InputText v-model="filters['global'].value" placeholder="Buscar categoría" class="w-100" />
				</template>
				<Column header="Categoria">
					<template #body="slotProps">
						<router-link :to="{ name: 'Products.List', query: { category: slotProps.data.title } }">
							<strong>{{ slotProps.data.title }}</strong>
						</router-link>
					</template>
				</Column>
			</DataTable>
		</template>
	</Card>
</template>