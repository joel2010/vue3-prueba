<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import useProducts from '@/composables/useProducts.ts'
import currencyFormat from '@/plugins/currency'
import { useGlobalStore } from '../store/global'
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import useGlobal from '../composables/useGlobal';

const route = useRoute()
const { fnAddProductToCart } = useGlobal()
const globalStore = useGlobalStore()
const { loading } = storeToRefs(globalStore)
const { fnFetchData, records } = useProducts()

const filters = ref({
	global: { value: '', matchMode: FilterMatchMode.CONTAINS },
});

onMounted(async () => {
	const query = route.query.category
	filters.value.global.value = query?.toString() || ''
	await fnFetchData()
})
</script>
<template>
	<Card>
		<template #title>Productos</template>
		<template #content>
			<DataTable :value="records" tableStyle="min-width: 50rem" v-model:filters="filters" :loading="loading"
				:globalFilterFields="['title', 'category']">
				<template #header>
					<InputText v-model="filters['global'].value" placeholder="Buscar producto" class="w-100" />
				</template>
				<Column header="Producto">
					<template #body="slotProps">
						<div class="d-flex align-items-center">
							<img :src="slotProps.data.image" :alt="slotProps.data.image" width="50" class="mr-2" />
							<strong>{{ slotProps.data.title }}</strong>
						</div>
					</template>
				</Column>
				<Column header="Precio">
					<template #body="slotProps">
						<div class="tex-tright">${{ currencyFormat(slotProps.data.price) }}
						</div>
					</template>
				</Column>
				<Column field="category" header="Category"></Column>
				<Column field="description" header="Desripción"></Column>
				<Column header="Acciones">
					<template #body="slotProps">
						<Button label="Agregar al carrito" @click="fnAddProductToCart(slotProps.data.id)"></Button>
					</template>
				</Column>
			</DataTable>
		</template>
	</Card>
</template>