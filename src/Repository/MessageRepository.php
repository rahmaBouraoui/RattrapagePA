<?php

namespace App\Repository;

use App\Entity\Message;
use App\Entity\MessageRedif;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method Message|null find($id, $lockMode = null, $lockVersion = null)
 * @method Message|null findOneBy(array $criteria, array $orderBy = null)
 * @method Message[]    findAll()
 * @method Message[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class MessageRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Message::class);
    }

    public function getMessagesUsers(Message $message)
    {
        return $this->createQueryBuilder('m')
            ->where('m.libelle = :libelle and m.userId = :u.id')
            ->setParameter('message', $message->getLibelle())
            ->setParameter('id', $user->getId())
            ->getQuery()
            ->getResult();
    }

    public function getLikedMessages(Message $message)
    {
        return $this->createQueryBuilder('m')
            ->where('m.username != :username and m.id != :id')
            ->setParameter('username', $message->getUsername())
            ->setParameter('id', $message->getId())
            ->getQuery()
            ->getResult();
    }

    public function getRedifMessages(MessageRedif $message)
    {
        return $this->createQueryBuilder('m')
            ->where('m.message = :message and m.userId = !u.id')
            ->setParameter('message', $message->getMessage())
            ->getQuery()
            ->getResult();
    }

}