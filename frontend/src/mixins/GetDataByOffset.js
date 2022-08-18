import { UP, DOWN } from "@/constants";
const SIZE = 10;
export default {
  data() {
    return {
      offset: 0,
      total: 0,
      size: SIZE,
    };
  },
  computed: {
    hasNextData() {
      return this.offset >= this.size;
    },
    hasPreviousData() {
      return this.offset + this.size < this.total;
    },
  },
  methods: {
    changeOffset(type) {
      switch (type) {
        case UP:
          this.offset -= this.size;
          break;
        case DOWN:
          this.offset += this.size;
          break;
      }
    },
  },
};
