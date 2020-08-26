// tag混合

import { getTags } from '@/api/get'

export default {
  data() {
    return {
      tags: [
        // { id: 1, name: 'js' },
        // { id: 2, name: 'vue' },
        // { id: 3, name: 'nodenodenodenode' }
      ],
    }
  },
  created() {
    this.getAllTags()
  },
  methods: {
    getAllTags(admin='') {
      getTags(admin)
        .then((res) => {
          if (res.status === 1) {
            this.tags = res.data
          } else {
            throw Error(res.err)
          }
        })
        .catch((err) => {
          throw Error(err)
        })
    },
  },
}