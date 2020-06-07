<template>
  <div>
    <a-button
      type="primary"
      shape="circle"
      icon="plus"
      style="margin-bottom: 2rem"
      @click="createTourPackageSchedule"
    />
    <a-table
      :columns="columns"
      :data-source="data"
      :row-key="record => record.id"
      :pagination="pagination"
    >
      <span slot="tourPackageScheduleDepature" slot-scope="tourPackageScheduleDepature">
        <p>{{convertDepatureDate(tourPackageScheduleDepature)}}</p>
      </span>
      <span slot="action" slot-scope="record">
        <a-button
          type="primary"
          shape="circle"
          icon="edit"
          ghost
          @click="updateTourPackageSchedule(record.id)"
        />
        <a-divider type="vertical" />
        <a-popconfirm
          placement="topRight"
          title="Kamu yakin menghapus nya?"
          ok-text="Ya"
          cancel-text="Tidak"
          @confirm="deleteTourPackageSchedule(record.id)"
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
          title: "Paket tour",
        dataIndex: "tourPackage.tour_package_name"
        },
        {
          title: "Harga",
          dataIndex: "tour_package_schedule_price"
        },
        {
          title: "Jumlah tiket",
          dataIndex: "tour_package_schedule_slot"
        },
        {
          title: "Tanggal berangkat",
          dataIndex: "tour_package_schedule_depature",
          scopedSlots: { customRender: "tourPackageScheduleDepature" },
        },
        {
          title: "Tempat berangkat",
          dataIndex: "tour_package_schedule_meet_point"
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
    this.getTourPackageSchedule();
  },
  methods: {
    async getTourPackageSchedule(){
        try {
        const {
          data: { dataTourPackageSchedule }
        } = await this.$http({
          method: "GET",
          url: "/tourpackageschedule"
        });
        this.data = dataTourPackageSchedule;
        this.pagination.total = dataTourPackageSchedule.length;
      } catch (error) {
        this.$message.error("Error! Terjadi kesalahan pasa server", 2);
      }
    },
    createTourPackageSchedule() {
      console.log("TEst");
    },
    updateTourPackageSchedule(id) {
      console.log(id);
    },
    deleteTourPackageSchedule(id) {
      console.log(id);
    },
    convertDepatureDate(tourPackageScheduleDepature){
      const DateTime = new Date(tourPackageScheduleDepature)
      let year = DateTime.getFullYear(),
          month = DateTime.getMonth()+1,
          date = DateTime.getDate(),
          hour = DateTime.getHours(),
          minute = DateTime.getMinutes()
      if (date < 10) {
        date = '0' + date;
      }
      if (month < 10) {
        month = '0' + month;
      }
      if(hour < 10){
        hour = '0' + hour
      }
       if(minute < 10){
        minute = '0' + minute
      }
      const depatureDate = `${year}-${month}-${date} ${hour}:${minute}`; 
      return depatureDate;
    }
  }
};
</script>