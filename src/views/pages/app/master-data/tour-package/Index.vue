<template>
  <div>
    <a-button
      type="primary"
      shape="circle"
      icon="plus"
      style="margin-bottom: 2rem"
      @click="createTourPackage"
    />
    <a-table
      :columns="columns"
      :data-source="data"
      :row-key="record => record.id"
      :pagination="pagination"
    >
      <span slot="action" slot-scope="record">
        <a-button
          type="primary"
          shape="circle"
          icon="edit"
          ghost
          @click="updateTourPackage(record.id)"
        />
        <a-divider type="vertical" />
        <a-popconfirm
          placement="topRight"
          title="Kamu yakin menghapus nya?"
          ok-text="Ya"
          cancel-text="Tidak"
          @confirm="deleteTourPackage(record.id)"
        >
          <a-button type="danger" shape="circle" icon="delete" ghost />
        </a-popconfirm>
      </span>
    </a-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [],
      pagination: {
        total: 0,
        defaultPageSize: 5
      },
      loading: false,
      columns: [
        {
          title: "Destinasi",
          dataIndex: "destination.destination_name",
          sorter: (value1, value2) =>
            value1.destination.destination_name.localeCompare(
              value2.destination.destination_name
            ),
          sortDirections: ["ascend", "descend"]
        },
        {
          title: "Paket tour",
          dataIndex: "tour_package_name",
          sorter: (value1, value2) =>
            value1.tour_package_name.localeCompare(value2.tour_package_name),
          sortDirections: ["ascend", "descend"]
        },
        {
          title: "Kategori",
          dataIndex: "tour_package_category"
        },
        {
          title: "Aksi",
          key: "action",
          scopedSlots: { customRender: "action" },
          align: "center"
        }
      ]
    };
  },
  mounted() {
    this.getTourPackageData();
  },
  methods: {
    async getTourPackageData() {
      try {
        const {
          data: { dataTourPackage }
        } = await this.$http({
          method: "GET",
          url: "/tourpackage"
        });
        this.data = dataTourPackage;
        this.pagination.total = dataTourPackage.length;
      } catch (error) {
        this.$message.error("Error! Terjadi kesalahan pasa server", 2);
      }
    },
    async deleteTourPackage(tourpackageId) {
      this.$message.loading("Deleting....", 0);
      try {
        const { data } = await this.$http({
          method: "DELETE",
          url: "/tourpackage",
          data: {
            tour_package_id: tourpackageId
          }
        });
        this.$message.destroy();
        this.$message.success(`${data.message}`, 2);
      } catch (error) {
        this.$message.destroy();
        this.$message.error("Terjadi kesalahan pada server", 2);
      } finally {
        this.getTourPackageData();
      }
    },
    createTourPackage() {
      this.$router.push({ path: "/tourpackage-create" });
    },
    updateTourPackage(tourpackageId) {
      this.$router.push({ path: `/tourpackage/${tourpackageId}` });
    }
  }
};
</script>
