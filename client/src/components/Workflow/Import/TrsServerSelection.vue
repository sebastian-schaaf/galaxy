<script setup lang="ts">
import { computed, type Ref, ref, watch } from "vue";

import { Services } from "../services";
import type { TrsSelection } from "./types";

const props = defineProps<{
    queryTrsServer?: string;
    trsSelection?: TrsSelection | null;
}>();

const emit = defineEmits<{
    (e: "onError", errorMessage: string): void;
    (e: "onTrsSelection", selection: TrsSelection): void;
}>();

const loading = ref(true);
const selection: Ref<TrsSelection | null> = ref(null);
const trsServers: Ref<TrsSelection[]> = ref([]);
const trsSelectionLookup: Ref<TrsSelection | null> = ref(null);

const showDropdown = computed(() => {
    return trsServers.value.length > 1;
});

watch(props, () => {
    selection.value = props.trsSelection ?? null;
});

const services = new Services();

async function configureTrsServers() {
    const servers = await services.getTrsServers();
    const queryTrsServer = props.queryTrsServer;

    trsServers.value = servers;

    if (queryTrsServer) {
        for (const server of servers) {
            if (server.id == queryTrsServer) {
                trsSelectionLookup.value = server;
                break;
            }

            if (possibleServeUrlsMatch(server.api_url, queryTrsServer)) {
                trsSelectionLookup.value = server;
                break;
            }

            if (possibleServeUrlsMatch(server.link_url, queryTrsServer)) {
                trsSelectionLookup.value = server;
                break;
            }
        }
    }

    if (trsSelectionLookup.value === null) {
        if (queryTrsServer) {
            emit("onError", "Failed to find requested TRS server " + queryTrsServer);
        }

        trsSelectionLookup.value = servers[0];
    }

    selection.value = trsSelectionLookup.value;
    loading.value = false;

    onTrsSelection(trsSelectionLookup.value as TrsSelection);
}

configureTrsServers();

function onTrsSelection(newSelection: TrsSelection) {
    selection.value = newSelection;
    emit("onTrsSelection", newSelection);
}

function possibleServeUrlsMatch(a: string, b: string) {
    // let http://trs_server.org/ match with https://trs_server.org for instance,
    // we'll only use the one configured on the backend for making actual calls, but
    // allow some robustness in matching it
    a = a.replace(/^https?:\/\//, "").replace(/\/$/, "");
    b = b.replace(/^https?:\/\//, "").replace(/\/$/, "");
    return a === b;
}
</script>

<template>
    <span v-if="!loading" class="m-1 text-muted">
        <span v-if="showDropdown" class="dropdown">
            <b-link
                id="dropdownTrsServer"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                class="font-weight-bold">
                {{ selection?.label }}
                <span class="fa fa-caret-down" />
            </b-link>
            <div class="dropdown-menu" aria-labelledby="dropdownTrsServer">
                <a
                    v-for="serverSelection in trsServers"
                    :key="serverSelection.id"
                    class="dropdown-item"
                    href="javascript:void(0)"
                    role="button"
                    @click.prevent="onTrsSelection(serverSelection)"
                    >{{ serverSelection.label }}</a
                >
            </div>
        </span>
        <span v-else>
            <b-link :href="selection?.link_url" target="_blank" class="font-weight-bold" :title="selection?.doc">
                {{ selection?.label }}
            </b-link>
        </span>
    </span>
</template>

<style scoped>
span.dropdown {
    display: inline-block;
}
</style>
