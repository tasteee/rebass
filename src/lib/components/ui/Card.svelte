<script lang="ts">
  import { cn } from '$lib/utils';

  let {
    class: className,
    children,
    ...props
  }: {
    class?: string;
    children?: any;
    [key: string]: any;
  } = $props();
</script>

<div
  class={cn('rounded-lg border bg-card text-card-foreground shadow-sm', className)}
  {...props}
>
  {@render children?.()}
</div>
