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
        label="Nama paket tour"
        ref="tour_package_name"
        prop="tour_package_name"
        @blur="
          () => {
            $refs.tour_package_name.onFieldBlur();
          }
        "
      >
        <a-input
          placeholder="Masukan nama paket"
          v-model="form.tour_package_name"
        />
      </a-form-model-item>
      <a-form-model-item
        label="Destinasi"
        ref="destination_id"
        prop="destination_id"
        @blur="
          () => {
            $refs.destination_id.onFieldBlur();
          }
        "
      >
        <a-select placeholder="Pilih destinasi" v-model="form.destination_id">
          <a-select-option
            v-for="destination in dataDestination"
            :key="destination.id"
            :value="destination.id"
            >{{ destination.destination_name }}</a-select-option
          >
        </a-select>
      </a-form-model-item>
      <a-form-model-item
        label="Kategori"
        ref="tour_package_category"
        prop="tour_package_category"
        @change="
          () => {
            $refs.tour_package_category.onFieldChange();
          }
        "
      >
        <a-radio-group size="large" v-model="form.tour_package_category">
          <a-radio-button value="UMUM">Umum</a-radio-button>
          <a-radio-button value="INSTANSI">Instansi</a-radio-button>
        </a-radio-group>
      </a-form-model-item>
      <a-form-model-item label="Poster paket tour">
        <a-upload-dragger
          name="tour_package_picture"
          accept=".png, .jpg, .jpeg"
          listType="picture"
          v-model="form.tour_package_picture"
          :disabled="disabledToUpload"
          :file-list="form.tour_package_picture"
          :before-upload="beforeUpload"
          @change="uploadChange"
        >
          <div v-if="disabledToUpload">
            <a-button @click="removePicture" type="danger" ghost>
              <a-icon type="delete" />Remove
            </a-button>
          </div>
          <div v-else>
            <p class="ant-upload-drag-icon">
              <a-icon type="upload" />
            </p>
            <p class="ant-upload-text">
              Drag atau klik untuk upload gambar poster
            </p>
            <p class="ant-upload-hint">
              Support format gambar
              <i> <strong>.png</strong> </i>, <i> <strong>.jpg</strong> </i>,
              <i>
                <strong>.jpeg</strong>
              </i>
            </p>
          </div>
        </a-upload-dragger>
      </a-form-model-item>
      <a-form-model-item
        label="Deskripsi paket tour"
        ref="tour_package_description"
        prop="tour_package_description"
        @blur="
          () => {
            $refs.tour_package_description.onFieldBlur();
          }
        "
      >
        <editor
          v-model="form.tour_package_description"
          api-key="a7vbynte9c0sekjkp9s0jh7gjt60j3959abz8vqh4kb4dtpc"
          :init="{
            height: 300,
            menubar: true,
            plugins: [
              'advlist autolink lists link charmap print preview anchor',
              'searchreplace visualblocks fullscreen',
              'insertdatetime table paste help wordcount'
            ],
            toolbar:
              'undo redo | formatselect | bold italic backcolor | \
                    alignleft aligncenter alignright alignjustify | \
                    bullist numlist outdent indent | removeformat | help'
          }"
        />
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 15, offset: 5 }">
        <a-button size="large" type="primary" block @click="submitTourPackage"
          >Save</a-button
        >
        <a-button style="margin-top: 1rem" size="large" block @click="resetForm"
          >Cancel</a-button
        >
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import Editor from "@tinymce/tinymce-vue";

export default {
  data() {
    return {
      dataDestination: [],
      disabledToUpload: false,
      labelCol: {
        span: 5
      },
      wrapperCol: {
        span: 15
      },
      form: {
        tour_package_name: "",
        destination_id: undefined,
        tour_package_category: "UMUM",
        tour_package_picture: [],
        tour_package_description: ""
      },
      rules: {
        tour_package_name: [
          {
            required: true,
            message: "Harap masukan nama paket tour",
            trigger: "blur"
          },
          {
            max: 80,
            message: "Nama paket tour terlalu panjang",
            trigger: "blur"
          }
        ],
        destination_id: [
          {
            required: true,
            message: "Harap pilih destinasi",
            trigger: "blur"
          }
        ],
        tour_package_category: [
          {
            required: true,
            message: "Harap pilih kategori tour",
            trigger: "blur"
          },
          {
            type: "enum",
            enum: ["UMUM", "INSTANSI"],
            message: "Error kategori tidak ditemukan",
            trigger: "blur"
          }
        ],
        tour_package_description: [
          {
            required: true,
            message: "Harap masukan deskripsi tour",
            trigger: "blur"
          }
        ]
      }
    };
  },
  mounted() {
    this.getDestination();
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    async getDestination() {
      try {
        const {
          data: { dataDestination }
        } = await this.$http({
          method: "GET",
          url: "/destination"
        });
        this.dataDestination = dataDestination;
      } catch (error) {
        this.$message.error("Error! Terjadi kesalahan pasa server", 2);
      }
    },
    uploadChange(info) {
      const sizeFile = info.file.size;
      const typeFile = info.file.type;
      if (sizeFile > 1500000) {
        this.$message.error("File gambar maksimum 1.5MB", 2);
        this.removePicture();
      } else {
        if (
          typeFile !== "image/png" &&
          typeFile !== "image/jpg" &&
          typeFile !== "image/jpeg"
        ) {
          this.$message.error("Format gambar tidak didukung", 2);
          this.removePicture();
        } else {
          this.disabledToUpload = true;
        }
      }
    },
    removePicture(file) {
      const index = this.form.tour_package_picture.indexOf(file);
      const newFileList = this.form.tour_package_picture.slice();
      newFileList.splice(index, 1);
      this.form.tour_package_picture = newFileList;
      this.disabledToUpload = false;
    },
    beforeUpload(file) {
      this.form.tour_package_picture = [
        ...this.form.tour_package_picture,
        file
      ];
      return false;
    },
    async submitTourPackage() {
      this.$message.loading("Loading....", 0);
      try {
        const dataDestination = new FormData();
        dataDestination.append(
          "tour_package_name",
          this.form.tour_package_name
        );
        dataDestination.append("destination_id", this.form.destination_id);
        dataDestination.append(
          "tour_package_category",
          this.form.tour_package_category
        );
        dataDestination.append(
          "tour_package_picture",
          this.form.tour_package_picture[0]
        );
        dataDestination.append(
          "tour_package_description",
          this.form.tour_package_description
        );
        const { data } = await this.$http({
          method: "POST",
          url: "/tourpackage",
          data: dataDestination
        });
        this.$message.destroy();
        this.$message.success(`${data.message}`, 2);
        this.resetForm();
      } catch (error) {
        if (error.response.status === 400) {
          this.$message.destroy();
          this.$message.error("Error! Cek kembali data inputan anda", 2);
          this.$refs.form.validate(valid => {
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
      this.removePicture();
    }
  },
  components: {
    editor: Editor
  }
};
</script>
