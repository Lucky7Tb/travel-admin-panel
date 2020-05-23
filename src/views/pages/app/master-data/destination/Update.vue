<template>
  <div>
    <a-button
      shape="round"
      icon="arrow-left"
      style="margin-bottom: 2rem"
      @click="goBack"
      >Back</a-button
    >
    <a-form-model
      ref="form"
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item
        label="Nama destinasi"
        ref="destination_name"
        prop="destination_name"
      >
        <a-input
          v-model="form.destination_name"
          placeholder="Masukan nama destinasi"
          @blur="
            () => {
              $refs.destination_name.onFieldBlur();
            }
          "
        />
      </a-form-model-item>
      <a-form-model-item
        label="Deskripsi destinasi"
        ref="destination_description"
        prop="destination_description"
      >
        <a-input
          v-model="form.destination_description"
          type="textarea"
          @blur="
            () => {
              $refs.destination_description.onFieldBlur();
            }
          "
        />
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 15, offset: 4 }">
        <a-button size="large" type="primary" block @click="updateDestination">
          Save
        </a-button>
        <a-button
          style="margin-top: 1rem"
          size="large"
          @click="resetForm"
          block
        >
          Cancel
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
export default {
  data() {
    return {
      labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 15,
      },
      form: {
        destination_id: undefined,
        destination_name: "",
        destination_description: "",
      },
      rules: {
        destination_name: [
          {
            required: true,
            message: "Harap masukan nama destinasi",
            trigger: "blur",
          },
        ],
        destination_description: [
          {
            max: 80,
            message: "Harap persingkat deskripsi destinasi",
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted() {
    this.retrieveDestination();
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    async retrieveDestination() {
      const {
        data: { dataDestination },
      } = await this.$http({
        method: "POST",
        url: "/destination/retrive",
        data: {
          destination_id: this.$route.params.id,
        },
      });
      this.form.destination_id = this.$route.params.id;
      this.form.destination_name = dataDestination.destination_name;
      this.form.destination_description = dataDestination.destination_description;
    },
    async updateDestination() {
      this.$message.loading("Loading....", 0);
      try {
        const { data } = await this.$http({
          method: "PUT",
          url: "/destination",
          data: {
            destination_id: this.form.destination_id,
            destination_name: this.form.destination_name,
            destination_description: this.form.destination_description,
          },
        });
        this.$message.destroy();
        this.$message.success(`${data.message}`, 2);
        this.resetForm();
        this.goBack();
      } catch (error) {
        if (error.response.status === 400) {
          this.$message.destroy();
          this.$message.error("Error! Cek kembali data inputan anda", 2);
          this.$refs.form.validate((valid) => {
            if (!valid) {
              return false;
            }
          });
        } else {
          this.$message.destroy();
          this.$message.error("Terjadi kesalahan pada server", 2);
        }
      }
    },
    resetForm() {
      this.$refs.form.resetFields();
    },
  },
};
</script>
