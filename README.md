# FAFIEC

### Docker
Enter docker directory with `cd docker`

###### Build and up containers
```docker
docker-compose up --build -d
```

###### Containers status
```docker
docker-compose ps
```

###### Down containers
```docker
docker-compose down
```

###### Stop/Start/restart containers
```docker
docker-compose stop/start/restart
```

###### Enter into Stage container
```docker
docker-compose exec app sh
```

###### Migration

php bin/console doctrine:migration:diff
php bin/console doctrine:migration:migrate


###### Enter into composer container
```docker
docker-compose exec composer bash
```

### Assets
Enter assets directory with `cd public`

###### Compile development assets
`npm run dev`

###### Compile production assets
`npm run prod`

###### Watch assets
`npm run watch`

