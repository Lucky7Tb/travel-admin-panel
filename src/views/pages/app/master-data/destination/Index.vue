<template>
  <div>
    <a-button
      type="primary"
      shape="circle"
      icon="plus"
      style="margin-bottom: 2rem"
      @click="createDestination"
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
          @click="updateDestination(record.id)"
        />
        <a-divider type="vertical" />
        <a-popconfirm
          placement="topRight"
          title="Kamu yakin menghapus nya?"
          ok-text="Ya"
          cancel-text="Tidak"
          @confirm="deleteDestination(record.id)"
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
      columns: [
        {
          title: "Destinasi",
          dataIndex: "destination_name",
          sorter: (value1, value2) =>
            value1.destination_name.localeCompare(value2.destination_name),
          sortDirections: ["ascend", "descend"]
        },
        {
          title: "Deskripsi",
          dataIndex: "destination_description",
          ellipsis: true
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
  created() {
    this.getDestinationData()
  },
  methods: {
    async getDestinationData() {
      try {
        const {
          data: { dataDestination }
        } = await this.$http({
          method: "GET",
          url: "/destination"
        });
        this.data = dataDestination;
        this.pagination.total = dataDestination.length;
      } catch (error) {
        this.$message.error("Error! Terjadi kesalahan pasa server", 2);
      }
    },
    async deleteDestination(destinationId) {
      this.$message.loading("Deleting....", 0);
      try {
        const { data } = await this.$http({
          method: "DELETE",
          url: "/destination",
          data: {
            destination_id: destinationId
          }
        });
        this.$message.destroy();
        this.$message.success(`${data.message}`, 2);
      } catch (error) {
        this.$message.destroy();
        this.$message.error("Terjadi kesalahan pada server", 2);
      } finally {
        this.getDestinationData();
      }
    },
    createDestination() {
      this.$router.push({ path: "/destination-create" });
    },
    updateDestination(destinationId) {
      this.$router.push({ path: `/destination/${destinationId}` });
    }
  }
};
</script>
