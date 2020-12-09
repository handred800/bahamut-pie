<script>
import { isNumber } from 'lodash';

export default {
  filters: {
    currency(num) {
      const target = isNumber(num) ? num.toString() : num;
      return target.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
    },
  },
};
</script>
