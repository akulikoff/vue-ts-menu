<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Search by title"
          v-model="title"
        />
        <div class="input-group-append">
          <button
            class="btn btn-outline-secondary"
            type="button"
            @click="searchTitle"
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Wish List</h4>
      <ul class="list-group">
        <li
          class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(dish, index) in dishes"
          :key="index"
          @click="setActiveDish(dish, index)"
        >
          {{ dish.title }}
        </li>
      </ul>
      <button class="m-3 btn btn-sm btn-danger" @click="removeAllDishes">
        Remove All
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="currentDish.id">
        <h4>Dish</h4>
        <div>
          <label><strong>Title:</strong></label> {{ currentDish.title }}
        </div>
        <div>
          <label><strong>Description:</strong></label>
          {{ currentDish.description }}
        </div>
        <div>
          <label><strong>Status:</strong></label>
          {{ currentDish.published ? "Published" : "Pending" }}
        </div>
        <a
          class="badge badge-warning"
          :href="'/dish/' + currentDish.id"
        >
          Edit
        </a>
      </div>
      <div v-else>
        <br />
        <p>Please click on a Dish...</p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import DishDataService from "@/services/DishDataService";
import Dish from "@/types/Dish";
@Component
export default class Menu extends Vue {
  private dishes: Dish[] = [];
  private currentDish = {} as Dish;
  private currentIndex: number = -1;
  private title: string = "";
  retrieveDishes() {
    DishDataService.getAll()
      .then((response) => {
        this.Dishes = response.data;
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  refreshList() {
    this.retrieveDishes();
    this.currentDish = {} as Dish;
    this.currentIndex = -1;
  }
  setActiveDish(dish: Dish, index: number) {
    this.currentDish = Dish;
    this.currentIndex = index;
  }
  removeAllDishes() {
    DishDataService.deleteAll()
      .then((response) => {
        console.log(response.data);
        this.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  }
  searchTitle() {
    DishDataService.findByTitle(this.title)
      .then((response) => {
        this.Dishes = response.data;
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  mounted() {
    this.retrieveDishes();
  }
}
</script>
<style scoped>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>