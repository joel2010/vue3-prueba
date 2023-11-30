<script lang="ts" setup>
import { onMounted } from 'vue';
import useGlobal from '../composables/useGlobal';
import { useUserStore } from '../store/user';
import { storeToRefs } from 'pinia';

const { fnFetchData, menuItems } = useGlobal()
const userStore = useUserStore()
const { user } = storeToRefs(userStore)

onMounted(async () => {
	await fnFetchData()
})
</script>

<template>
	<div class="aside">
		<div class="card d-flex justify-content-center">
			<Menu :model="menuItems" class="w-full md:w-15rem">
				<template #start>
					<span class="d-block px-2 py-2 text-center">
						<span class="font-bold text-xl">PRUEBA TÉCNICA</span>
					</span>
				</template>
				<template #submenuheader="{ item }">
					<span class="text-primary font-bold">{{ item.label }}</span>
				</template>
				<template #item="{ item, props }">
					<router-link v-if="item.routeName" v-slot="{ href, navigate }" :to="{ name: item.routeName }" custom>
						<a v-ripple :href="href" v-bind="props.action" @click="navigate">
							<span :class="item.icon" />
							<span class="d-block ml-2 mr-2">{{ item.label }}</span>
						</a>
					</router-link>
				</template>
				<template #end>
					<button v-ripple v-if="user" bag
						class="relative overflow-hidden w-full p-link d-flex align-items-center p-2 text-color hover:surface-200 border-noround">
						<Avatar :label="user.username.substring(0, 1)" class="mr-2" size="large" shape="circle" />
						<span class="d-inline-flex flex-column mr-2">
							<span class="font-bold">{{ user.name.firstname }} {{ user.name.lastname }}</span>
							<span class="text-sm">{{ user.username }}</span>
						</span>
					</button>
				</template>
			</Menu>
		</div>
	</div>
	<main class="main">
		<RouterView />
	</main>
</template>
