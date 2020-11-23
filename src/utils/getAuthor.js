export default function getAuthor(authorRef) {
  return authorRef.get().then(doc => ({ id: doc.id, ...doc.data() }));
}
