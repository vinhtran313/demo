echo "Are you sure to reset db? (yes or no)"

read answer

case "${answer}" in
    [yY]|[yY][eE][sS])
      npm run migrate:reset && npm run migrate && npm run seed && echo "Done !";;
    *)
      echo "Nothing to do";;
esac