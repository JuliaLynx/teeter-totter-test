<template>
  <div>
    <GameControls />
    <Balancer />
    <Statistics />
  </div>
</template>

<script>
  import GameControls from '@/components/GameControls';
  import Balancer from '@/components/Balancer';
  import Statistics from '@/components/Statistics';

  export default {
    name: 'Game',
    components: {
      Balancer,
      GameControls,
      Statistics
    }
  }
</script>