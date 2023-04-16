<script>
  import FavoriteFilledIcon from '../icons/FavoriteFilledIcon.svelte';
</script>

<footer class="group flex items-center justify-center space-x-[0.25ch] p-4 text-xs" id="footer">
  <span> Created with </span>
  <figure class="w-4">
    <FavoriteFilledIcon />
  </figure>
  <span> by </span>
  <a
    class="hover:bold-shadow focus-visible:bold-shadow inline-block rounded-md bg-neutral-800 p-1.5 text-slate-100 underline transition hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-sky-400 hover:text-neutral-800 focus:outline-none focus-visible:-translate-x-0.5 focus-visible:-translate-y-0.5 focus-visible:bg-sky-400 focus-visible:text-neutral-800"
    href="https://github.com/DontMash"
    target="_blank"
    rel="noreferrer"
  >
    @DontMash
  </a>
</footer>
