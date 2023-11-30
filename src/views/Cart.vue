<script setup lang="ts">
import { onMounted } from 'vue';
import useGlobal from '../composables/useGlobal';
import { storeToRefs } from 'pinia';
import currencyFormat from '@/plugins/currency'
import { useUserStore } from '../store/user';
import { useGlobalStore } from '../store/global';
import useProducts from '../composables/useProducts';

const { fnFetchData: fnLoadProducts } = useProducts()
const globalStore = useGlobalStore()
const { loading } = storeToRefs(globalStore)
const userStore = useUserStore();
const { cart } = storeToRefs(userStore);
const { fnFetchMyCart, fnUpdateQuantity, fnDeleteProduct } = useGlobal()

onMounted(async () => {
	await fnLoadProducts()
	if (!cart.value) {
		await fnFetchMyCart()
	}
})
</script>
<template>
	<Card v-if="cart">
		<template #title>Mi carrito</template>
		<template #content>
			<DataView :value="cart?.products">
				<template #list="slotProps">
					<div v-for="(item, index) in slotProps.items" :key="index" class="cart__item">
						<img class="img-fluid mr-2" width="100" :src="item.product.image" :alt="item.product.title" />
						<div class="cart__item-details">
							<h2>{{ item.product.title }}</h2>
							<h3>${{ currencyFormat(item.product.price) }}</h3>
							<span class="d-flex align-items-center">
								<i class="pi pi-tag mr-2"></i>
								<span class="font-semibold">{{ item.product.category }}</span>
							</span>
						</div>
						<div class="cart__item-btn">
							<InputNumber v-model="item.quantity" :disabled="loading" :min="1" class="form-control"
								showButtons />
							<hr>
							<Button :disabled="loading" @click="fnDeleteProduct(item.productId)" class="w-100"
								label="Eliminar" severity="danger"></Button>
						</div>
					</div>
				</template>
			</DataView>
		</template>
	</Card>
	<br><br>
	<Card v-if="cart">
		<template #content>
			<div class="d-flex justify-content-between">
				<h1>Total de productos</h1>
				<h1>{{ cart.totalItems }}</h1>
			</div>
			<div class="d-flex justify-content-between">
				<h1>Total</h1>
				<h1>${{ currencyFormat(cart.total) }}</h1>
			</div>
		</template>
	</Card>
	<Button class="w-100" label="Actualizar carrito" :disabled="loading" :loading="loading"
		@click="fnUpdateQuantity"></Button>
</template>