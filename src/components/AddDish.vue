<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          required
          v-model="dish.title"
          name="title"
        />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <input
          class="form-control"
          id="description"
          required
          v-model="dish.description"
          name="description"
        />
      </div>
      <button @click="saveDish" class="btn btn-success">Submit</button>
    </div>
    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newDish">Add</button>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import DishDataService from "@/services/DishDataService";
import Dish from "@/types/Dish";
@Component
export default class AddDish extends Vue {
  private dish: Dish = {
    id: null,
    title: "",
    description: "",
    price: 0,
    published: false,
  };
  private submitted: boolean = false;
  saveDish() {
    let data = {
      title: this.dish.title,
      description: this.dish.description,
    };
   DishDataService.create(data)
      .then((response) => {
        this.dish.id = response.data.id;
        console.log(response.data);
        this.submitted = true;
      })
      .catch((e) => {
        console.log(e);
      });
  }
  newDish() {
    this.submitted = false;
    this.dish = {} as Dish;
  }
}
</script>
<style scoped>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>