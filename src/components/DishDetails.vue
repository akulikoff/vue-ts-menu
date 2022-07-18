<template>
  <div v-if="currentDish.id" class="edit-form">
    <h4>Dish</h4>
    <form>
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          v-model="currentDish.title"
        />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <input
          type="text"
          class="form-control"
          id="description"
          v-model="currentDish.description"
        />
      </div>
      <div class="form-group">
        <label><strong>Status:</strong></label>
        {{ currentDish.published ? "Published" : "Pending" }}
      </div>
    </form>
    <button
      class="badge badge-primary mr-2"
      v-if="currentDish.published"
      @click="updatePublished(false)"
    >
      UnPublish
    </button>
    <button
      v-else
      class="badge badge-primary mr-2"
      @click="updatePublished(true)"
    >
      Publish
    </button>
    <button class="badge badge-danger mr-2" @click="deleteDish">
      Delete
    </button>
    <button type="submit" class="badge badge-success" @click="updateDish">
      Update
    </button>
    <p>{{ message }}</p>
  </div>
  <div v-else>
    <br />
    <p>Please click on a Dish...</p>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import DishDataService from "@/services/DishDataService";
import Dish from "@/types/Dish";
@Component
export default class DishDetails extends Vue {
  private currentDish = {} as Dish;
  private message: string = "";
  getDish(id: string) {
    DishDataService.get(id)
      .then((response) => {
        this.currentDish = response.data;
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  updatePublished(status: boolean) {
    let data = {
      id: this.currentDish.id,
      title: this.currentDish.title,
      description: this.currentDish.description,
      published: status,
    };
    DishDataService.update(this.currentDish.id, data)
      .then((response) => {
        this.currentDish.published = status;
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  updateDish() {
    DishDataService.update(this.currentDish.id, this.currentDish)
      .then((response) => {
        console.log(response.data);
        this.message = "The Dish was updated successfully!";
      })
      .catch((e) => {
        console.log(e);
      });
  }
  deleteDish() {
    DishDataService.delete(this.currentDish.id)
      .then((response) => {
        console.log(response.data);
        this.$router.push({ name: "Dish" });
      })
      .catch((e) => {
        console.log(e);
      });
  }
  mounted() {
    this.message = "";
    this.getDish(this.$route.params.id);
  }
}
</script>
<style scoped>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>