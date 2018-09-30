<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

 /**
 * @ORM\Entity
 * @ORM\Table(name="message")
 * @ORM\Entity(repositoryClass="App\Repository\MessageRepository")
 */
class Message
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $libelle;

    /**
     * @ORM\ManyToOne(targetEntity="User", inversedBy="messages")
     */
    private $user;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\MessageLike", mappedBy="message")
     */
    private $messageLikes;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\MessageRedif", mappedBy="message")
     */
    private $messageRedifs;

    public function __construct()
    {
        $this->messageLikes = new ArrayCollection();
        $this->messageRedifs = new ArrayCollection();
    }

    public function getId()
    {
        return $this->id;
    }

    public function getLibelle()
    {
        return $this->libelle;
    }

    public function setLibelle(string $libelle)
    {
        $this->libelle = $libelle;

        return $this;
    }

    /**
     * @return User
     */
    public function getUser()
    {
        return $this->user;
    }

    /**
     * @param User $user
     * @return Message
     */
    public function setUser(User $user = null)
    {
        $this->user = $user;
        return $this;
    }

    /**
     * @return Collection|MessageLike[]
     */
    public function getMessageLikes(): Collection
    {
        return $this->messageLikes;
    }

    public function addMessageLike(MessageLike $messageLike): self
    {
        if (!$this->messageLikes->contains($messageLike)) {
            $this->messageLikes[] = $messageLike;
            $messageLike->addMessage($this);
        }

        return $this;
    }

    public function removeMessageLike(MessageLike $messageLike): self
    {
        if ($this->messageLikes->contains($messageLike)) {
            $this->messageLikes->removeElement($messageLike);
            $messageLike->removeMessage($this);
        }

        return $this;
    }

    /**
     * @return Collection|MessageRedif[]
     */
    public function getMessageRedifs(): Collection
    {
        return $this->messageRedifs;
    }

    public function addMessageRedif(MessageRedif $messageRedif): self
    {
        if (!$this->messageRedifs->contains($messageRedif)) {
            $this->messageRedifs[] = $messageRedif;
            $messageRedif->addMessage($this);
        }

        return $this;
    }

    public function removeMessageRedif(MessageRedif $messageRedif): self
    {
        if ($this->messageRedifs->contains($messageRedif)) {
            $this->messageRedifs->removeElement($messageRedif);
            $messageRedif->removeMessage($this);
        }

        return $this;
    }

}
